import LinkRepository from "../repository/link.repository";

class linkService {
    constructor() { 
        this.linkRepository = new LinkRepository()
    }

     save_link = async (xl) => {
        try {
            const { link, title, tags } = await xl.body();

            const userPayload = await xl.get("user");

            const { _id } = userPayload;

            //here we can do is to check whether this user exist or not in our db but im not writing that
            const linkData = {
                title: title ?? "No title has been given to this link",
                link,
                user: _id,
                tags,
            };
            await this.linkRepository.createLink(linkData)

            return xl.json(
                {
                    success: true,
                    message: "successfully created link",
                },
                200
            );

        } catch (error) {
            console.error("Error creating link:", error);
            return xl.json(
                {
                    success: false,
                    message: "An error occurred while creating the link",
                    error: error.message,
                },
                500
            );
        }
    }

     delete_link = async (xl) => {
        const {link_id} = xl.getParams('link_id')
        try {
           if (!link_id) {
               return xl.json({   
                       success: false, 
                       message: "Invalid link" 
                   },  400);
           }

           const link = await this.linkRepository.findLinkById(link_id)
           if (!link) {
               return xl.json({
                   success: false,
                   message: "Link not found"
               }, 404);
           }
   
           await this.linkRepository.deleteLink(link)
   
           return xl.json({
               success:true,
               message:"link deleted successfully"
           },200)

        } catch (error) {
           console.error("Error deleting link:", error);
           return xl.json({ 
               success:false,
               message: "An error occurred while deleting the link", error: error.message }, 
               500);
       }
    }

     get_links = async (xl) => {
        try {
            const {page,filter} = await xl.getQuery()
            const token = xl.get('token')
            const { _id } = token.payload;
            
            const links = await this.linkRepository.findLinksByUserIdWithFilter(_id,filter,page)

            return xl.json(
              {
                success: true,
                data: links,
                message: "Successfullt got the user links",
              },
              200
            );

          } catch (error) {
            console.error("Error while getting links:", error);
            return xl.json(
              {
                success: false,
                message: `Error while getting links , ${error}`,
              },
              500
            );
          }
    }
}

export default linkService
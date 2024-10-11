import { LinkModel } from "../models/link.model";

class LinkRepository{
    constructor(){}

    async createLink(linkData) {
        const newLink = new LinkModel(linkData);
        return newLink.save();
    }

    async findLinkById(link_id) {
        return LinkModel.findOne({
            _id: link_id,
            isDeleted: false
        });
    }

    async deleteLink(link) {
        link.isDeleted = true;
        return link.save();
    }

    async findLinksByUserIdWithFilter(user_id,filter,page){
        const matchCondition = { 
            user: new mongoose.Types.ObjectId(userId), 
            isDeleted: false 
        };

        if (filter) {
            matchCondition["$or"] = [
                { title: { $regex: filter, $options: "i" } },
                { tags: { $regex: filter, $options: "i" } },
            ];
        }
       return await LinkModel.aggregate([
            { $match: matchCondition},
            // ned to add serch filetr
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * 10 },
            { $limit: 10 },
            {
              $project: {
                _id: 1,
                title: 1,
                link: 1,
                tags: 1,
                createdAt: 1,
                user: 1,
                isDeleted: 1,
              },
            },
          ]);
    }

}

export default LinkRepository
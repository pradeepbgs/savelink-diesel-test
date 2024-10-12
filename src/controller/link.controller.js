import LinkService from "../services/link.service";

export default class LinkController {
    constructor(){
        this.linkService = new LinkService()
    }

    createLink = async (ctx) => {
        try {
            return this.linkService.save_link(ctx)
        } catch (error) {
            return ctx.status(400).json({
                success:false,
                message:"error while creating link"
            })
        }
    }

    deleteLink = async (ctx) => {
        try {
            return this.linkService.delete_link(ctx)
        } catch (error) {
            return ctx.status(400).json({
                success:false,
                message:"error while deleting link"
            })
        }
    }

    getLinks = async (ctx) => {
        try {
            return this.linkService.get_links(ctx)
        } catch (error) {
            return ctx.status(400).json({
                success:false,
                message:"error while retreiving links"
            })
        }
    }

}
import Router from 'diesel-core'
import { verifyJwt } from '../middleware/auth.middleware'
import LinkController from '../controller/link.controller'

export const linkRouter = new Router()
const linkController = new LinkController()

linkRouter
.post("/save-link",verifyJwt,linkController.createLink)

linkRouter
.delete("/delete-link",verifyJwt,linkController.deleteLink)

linkRouter
.get("/get-links",verifyJwt,linkController.getLinks)
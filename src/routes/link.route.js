import Router from 'diesel-core'
import linkService from '../services/link.service'
import { verifyJwt } from '../middleware/auth.middleware'

export const linkRouter = new Router()
const link_service = new linkService()

linkRouter
.post("/save-link",verifyJwt,link_service.save_link)

linkRouter
.delete("/delete-link",verifyJwt,link_service.delete_link)

linkRouter
.get("/get-links",verifyJwt,link_service.get_links)
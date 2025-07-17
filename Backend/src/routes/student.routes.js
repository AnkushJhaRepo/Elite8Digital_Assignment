import { Router } from "express"
import {
    currentStudent,
    getAllStudents,
    login,
    logout,
    registerStudent,
    toggleFees,
    updateDetails

} from "../controllers/student.controllers.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js"

const router = Router()

router.route("/register").post(registerStudent)
router.route("/login").post(login)
router.route("/get-all").get(getAllStudents)
router.route("/update").patch(verifyJWT, updateDetails)
router.route("/toggle-fees").patch(verifyJWT, toggleFees)
router.route("/logout").post(verifyJWT, logout)
router.route("/current").get(verifyJWT, currentStudent)



export default router
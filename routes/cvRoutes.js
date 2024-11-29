const express = require("express");
const router = express.Router();
const cvController = require("../controllers/cv");
const authMiddleware = require("../middleware/authMiddleware");

/**
 * @swagger
 * tags:
 *   name: Cv
 *   description: API to manage Resumes (ed cv)
 */

/**
 * @swagger
 * /api/cv/one/:id:
 *   get:
 *     summary: Get a Cv
 *     description: Retrieve a Cv based on its id
 *     tags:
 *       - Cv
 *     responses:
 *       200:
 *         description: Successfully retrieved cv information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the cv.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 nom:
 *                   type: string
 *                   description: The author's last name.
 *                   example: Doe
 *                 prenom:
 *                   type: string
 *                   description: The author's first name.
 *                   example: John
 *                 title:
 *                   type: string
 *                   description: Le title of the 
 *                   example: Full-Stack Developper
 *                 description:
 *                   type: string
 *                   description: The user's email address.
 *                   example: Locking for a job in the est of london...
 *                 techSkills:
 *                   type: array
 *                   description: All the technicall skills
 *                   example: C#, git, nodeJs
 *                 softSkills:
 *                   type: array
 *                   description: All the general skills
 *                   example: really really smart, serious, autonomus
 *                 certifications:
 *                   type: array
 *                   description: All the certifications/degrees
 *                   example: degree, scrum, azure
 *                 expPro:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       entreprise:
 *                         type: string
 *                         description: The company the person worked for
 *                         example: Amazon
 *                       poste:
 *                         type: string
 *                         description: The position is the company
 *                         example: Lead Dev
 *                       description:
 *                         type: string
 *                         decription: all the other information about the position
 *                 visble:
 *                   type: boolean
 *                   description: true if visible for other users than the author
 *                   example: true/false
 *                 authorId:
 *                   type: int
 *                   description: The user id of the author
 *                   example: 5645615156185
 *       404:
 *         description: Cv not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/one/:id", authMiddleware, cvController.getOne);

/**
 * @swagger
 * /api/cv/:
 *   get:
 *     summary: Get all Cvs
 *     description: Retrieve all Cv
 *     tags:
 *       - Cv
 *     responses:
 *       200:
 *         description: Successfully retrieved cv information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the cv.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   nom:
 *                     type: string
 *                     description: The author's last name.
 *                     example: Doe
 *                   prenom:
 *                     type: string
 *                     description: The author's first name.
 *                     example: John
 *                   title:
 *                     type: string
 *                     description: Le title of the 
 *                     example: Full-Stack Developper
 *                   description:
 *                     type: string
 *                     description: The user's email address.
 *                     example: Locking for a job in the est of london...
 *                   techSkills:
 *                     type: array
 *                     description: All the technicall skills
 *                     example: C#, git, nodeJs
 *                   softSkills:
 *                     type: array
 *                     description: All the general skills
 *                     example: really really smart, serious, autonomus
 *                   certifications:
 *                     type: array
 *                     description: All the certifications/degrees
 *                     example: degree, scrum, azure
 *                   expPro:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         entreprise:
 *                           type: string
 *                           description: The company the person worked for
 *                           example: Amazon
 *                         poste:
 *                           type: string
 *                           description: The position is the company
 *                           example: Lead Dev
 *                         description:
 *                           type: string
 *                           decription: all the other information about the position
 *                   visble:
 *                     type: boolean
 *                     description: true if visible for other users than the author
 *                     example: true/false
 *                   authorId:
 *                     type: int
 *                     description: The user id of the author
 *                     example: 5645615156185
 *       404:
 *         description: Cv not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/", cvController.getByToken);

/**
 * @swagger
 * /api/cv/search/:search:
 *   get:
 *     summary: Search for Cvs
 *     description: Retrieve all Cv based on their title
 *     tags:
 *       - Cv
 *     responses:
 *       200:
 *         description: Successfully retrieved cv information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier of the cv.
 *                     example: "670507e5a85e8b4542098ab9"
 *                   nom:
 *                     type: string
 *                     description: The author's last name.
 *                     example: Doe
 *                   prenom:
 *                     type: string
 *                     description: The author's first name.
 *                     example: John
 *                   title:
 *                     type: string
 *                     description: Le title of the 
 *                     example: Full-Stack Developper
 *                   description:
 *                     type: string
 *                     description: The user's email address.
 *                     example: Locking for a job in the est of london...
 *                   techSkills:
 *                     type: array
 *                     description: All the technicall skills
 *                     example: C#, git, nodeJs
 *                   softSkills:
 *                     type: array
 *                     description: All the general skills
 *                     example: really really smart, serious, autonomus
 *                   certifications:
 *                     type: array
 *                     description: All the certifications/degrees
 *                     example: degree, scrum, azure
 *                   expPro:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         entreprise:
 *                           type: string
 *                           description: The company the person worked for
 *                           example: Amazon
 *                         poste:
 *                           type: string
 *                           description: The position is the company
 *                           example: Lead Dev
 *                         description:
 *                           type: string
 *                           decription: all the other information about the position
 *                   visble:
 *                     type: boolean
 *                     description: true if visible for other users than the author
 *                     example: true/false
 *                   authorId:
 *                     type: int
 *                     description: The user id of the author
 *                     example: 5645615156185
 *       404:
 *         description: Cv not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/search/:search", cvController.search);

/**
 * @swagger
 * /api/cv/:
 *   post:
 *     summary: Create new Cv
 *     description: Create new Cv
 *     tags:
 *       - Cv
 *     responses:
 *       200:
 *         description: Successfully created cv.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the cv.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 nom:
 *                   type: string
 *                   description: The author's last name.
 *                   example: Doe
 *                 prenom:
 *                   type: string
 *                   description: The author's first name.
 *                   example: John
 *                 title:
 *                   type: string
 *                   description: Le title of the 
 *                   example: Full-Stack Developper
 *                 description:
 *                   type: string
 *                   description: The user's email address.
 *                   example: Locking for a job in the est of london...
 *                 techSkills:
 *                   type: array
 *                   description: All the technicall skills
 *                   example: C#, git, nodeJs
 *                 softSkills:
 *                   type: array
 *                   description: All the general skills
 *                   example: really really smart, serious, autonomus
 *                 certifications:
 *                   type: array
 *                   description: All the certifications/degrees
 *                   example: degree, scrum, azure
 *                 expPro:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       entreprise:
 *                         type: string
 *                         description: The company the person worked for
 *                         example: Amazon
 *                       poste:
 *                         type: string
 *                         description: The position is the company
 *                         example: Lead Dev
 *                       description:
 *                         type: string
 *                         decription: all the other information about the position
 *                 visble:
 *                   type: boolean
 *                   description: true if visible for other users than the author
 *                   example: true/false
 *                 authorId:
 *                   type: int
 *                   description: The user id of the author
 *                   example: 5645615156185
 *       404:
 *         description: Request error.
 *       500:
 *         description: Internal server error.
 */
router.post("/", authMiddleware, cvController.createCv);

/**
 * @swagger
 * /api/cv/:id:
 *   put:
 *     summary: Update a Cv
 *     description: Update a cv
 *     tags:
 *       - Cv
 *     responses:
 *       200:
 *         description: Successfully updated cv information.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: The unique identifier of the cv.
 *                   example: "670507e5a85e8b4542098ab9"
 *                 nom:
 *                   type: string
 *                   description: The author's last name.
 *                   example: Doe
 *                 prenom:
 *                   type: string
 *                   description: The author's first name.
 *                   example: John
 *                 title:
 *                   type: string
 *                   description: Le title of the 
 *                   example: Full-Stack Developper
 *                 description:
 *                   type: string
 *                   description: The user's email address.
 *                   example: Locking for a job in the est of london...
 *                 techSkills:
 *                   type: array
 *                   description: All the technicall skills
 *                   example: C#, git, nodeJs
 *                 softSkills:
 *                   type: array
 *                   description: All the general skills
 *                   example: really really smart, serious, autonomus
 *                 certifications:
 *                   type: array
 *                   description: All the certifications/degrees
 *                   example: degree, scrum, azure
 *                 expPro:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       entreprise:
 *                         type: string
 *                         description: The company the person worked for
 *                         example: Amazon
 *                       poste:
 *                         type: string
 *                         description: The position is the company
 *                         example: Lead Dev
 *                       description:
 *                         type: string
 *                         decription: all the other information about the position
 *                 visble:
 *                   type: boolean
 *                   description: true if visible for other users than the author
 *                   example: true/false
 *                 authorId:
 *                   type: int
 *                   description: The user id of the author
 *                   example: 5645615156185
 *       400:
 *         description: Request error.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", authMiddleware, cvController.editCv);

/**
 * @swagger
 * /api/cv/:id:
 *   delete:
 *     summary: Delete a Cv
 *     description: Retrieve a Cv based on its id
 *     tags:
 *       - Cv
 *     responses:
 *       204:
 *         description: Cv has been removed successfully.
 *       404:
 *         description: No record with given id.
 *       500:
 *         description: Internal server error.
 */
router.delete("/:id", authMiddleware, cvController.deleteCv);

module.exports = router;

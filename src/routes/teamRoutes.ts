import express, { Request, Response } from 'express'
import { v4 as uuid4 } from 'uuid'
import { validateToken } from '../middlewares/auth'
import Company from '../models/Company'
import Team from '../models/Team'
import { CustomErrors } from '../types'

const router = express.Router()

router.post('/:company_id', validateToken, async (req: Request, res: Response) => {
    if (!req.body.team_lead_name)
        return res.status(422).json({
            message: "team_lead_name missing in body"
        })
    const { company_id } = req.params
    try {
        const comp:any = await Company.findOne({ uuid: company_id })
        if (comp == null)
            return res.status(422).json({
                message: "Given Company not found"
            })
        const team:any = await Team.create({ ...req.body, company_id, uuid: uuid4() })
        res.status(201).json(team)
    }
    catch (err: any) {
        console.log(err)
        if (err.name == 'ValidationError') {
            const errors: CustomErrors = []
            for (let field in err.errors) {
                errors.push({
                    name: err.errors[field].name,
                    message: err.errors[field].message
                })
                console.log(err.errors[field].message);
            }
            return res.status(422).json(errors)
        }
        res.status(400).json({
            "message": "Something went wrong"
        })
    }

})


export default router
import express, { Request, Response, Router } from 'express'
import { v4 as uuid4 } from 'uuid'
import { validateToken } from '../middlewares/auth'
import Company from '../models/Company'
import { CustomErrors } from '../types'

const router:Router = express.Router()

router.post('/', validateToken, async (req: Request, res: Response) => {
    try {
        const company:any = await Company.create({ ...req.body, uuid: uuid4() })
        const {_id,__v,...wantedFields} = company._doc
        res.status(201).json(wantedFields)
    }
    catch (err:any) {
        if (err.name == 'ValidationError') {
            const errors:CustomErrors=[]
            for (let field in err.errors) {
                errors.push({
                    name:err.errors[field].name,
                    message:err.errors[field].message
                })
                console.log(err.errors[field].message); 
            }
            return res.status(422).json(errors)
        }
        console.log(err)
        res.status(400).json({
            "message": "Something went wrong"
        })
    }
})

router.get("/search", validateToken, async (req: Request, res: Response) => {
    const { company_name } = req.query;
    if(!company_name){
        return res.status(429).json({
            message:"No company name provided in Query params"
        })
    }
    console.log(req.query);

    try {
        const companies:Array<any> = await Company.find({
            company_name
        },{_id:0,__v:0})
        console.log(companies);

        if (companies.length > 0) {
            res.status(200).json({
                companies,
                count: companies.length
            })
        }
        else {
            res.status(200).send({
                companies,
                count: 0
            })
        }
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            "message": "Something went wrong"
        })
    }
})

router.get("/:id", validateToken, async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const company:any = await Company.findOne({
            uuid: id
        },{_id:0,__v:0})
        if(!company){
            res.status(200).json({
                message:"No Company found"
            })
        }
        res.status(200).json(company)
    }
    catch (err) {
        console.log(err)
        res.status(400).json({
            "message": "Something went wrong"
        })
    }
})

export default router
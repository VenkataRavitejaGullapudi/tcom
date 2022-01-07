import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import express, { Application, Request, Response } from 'express'
import connectToDB from './config/database'
import { validateToken } from './middlewares/auth'
import Company from './models/Company'
import Team from './models/Team'
import companyRoutes from './routes/companyRoutes'
import teamRoutes from './routes/teamRoutes'
import tokenRoutes from './routes/tokenRoutes'
dotenv.config()
const app: Application = express()


connectToDB();
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cookieParser())


app.get('/',(req:Request,res:Response)=>{
    res.render("home")
})

app.use('/api/v1/company',companyRoutes)
app.use('/api/v1/team',teamRoutes)
app.use('/api/v1/token',tokenRoutes)

app.get('/api/v1/allteams',validateToken,async(req:Request,res:Response)=>{
    try{
        const companies:any = await Company.find({},{_id:0,__v:0}).lean()
        for(let i=0; i<companies.length;i++){
            const teams:any = await Team.find({
                company_id:companies[i].uuid
            },{_id:0,__v:0})
            companies[i].teams = teams
        }
        if(companies.length>0)
            return res.status(200).json(companies)
        res.status(200).json({
            companies,
            message:"No Companies exists"
        })
    }
    catch(err){
        console.log(err)
        res.status(400).json({
            "message": "Something went wrong"
        })
    }
})

app.set("view engine","ejs")



app.listen(PORT, (): void => {
    console.log(`Server Running at Port ${PORT}`)
})

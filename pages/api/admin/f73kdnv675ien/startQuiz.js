import { Qualifier } from "@/models/qualifier";
import connectMongoDB from '@/libs/mongodb';

export default async function handler(req, res) {
    try {
        connectMongoDB();

        const qualifiers = await Qualifier.findOne({ teamName: "team1" });
        let startTime = new Date("January 15, 2024 16:45:00");
        startTime.toTimeString()
        startTime= startTime-4;
        console.log(startTime);
        const currentTime = Date.now();
       
        console.log(currentTime);

        if (Math.abs((currentTime) - startTime) <= 600000) {
            
            await Qualifier.findOneAndUpdate(
                { teamName: "team1" },
                {
                    $set: {
                        questionCategory: "easy",
                        questionPointer: 0
                    }
                }
            );
            res.status(200).json({
                message: "Qualifier round started"
            });
        }else if(currentTime<startTime){
            res.status(401).json({
                message:"Quiz has not started yet"
            })
        } else {
            
            res.status(200).json({
                message: "Too late"
            });
        }
    } catch (error) {
        return res.status(500).json({
            error: "Something went wrong",
            e: error.toString()
        });
    }
}
import connectMongoDB from '@/libs/mongodb';
import { Level1 } from '@/models/level1';
import { TeamModel } from '@/models/teamModel';

export default async function handler(req, res) {
  try {
    connectMongoDB();
    const teams = await TeamModel.find();
    let team;
    for (team of teams) {
      const teamId = team._id;
      const teamName = team.teamName;
      const leaderName = team.leaderName;
      const leaderEmail = team.leaderEmail;
      await new Level1({
        teamName: teamName,
        teamId: teamId,
        leaderName: leaderName,
        leaderEmail: leaderEmail,
      }).save();
    }
    res.status(200).json({
      message: 'Data has been assigned',
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
}

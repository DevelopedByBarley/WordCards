import Card from "../models/Card";

export async function setCardsForRepeat(userId: string) {
  const now = new Date();

  const expiredRecords = await Card.find({
    expires: { $lt: now },
    state: { $lt: 6 },
    user: userId
  });

  expiredRecords.forEach(async (record: Record<string, any>) => {
    
    
    const updated = await Card.findOneAndUpdate(
      { _id: record._id },
      { repeat: true },
      { new: true }
    );
  })
  
}

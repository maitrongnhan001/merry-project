const link = require('../models/link.model')

module.exports.getlink = async (req, res) =>{
    try{
        // return res.json({data: "hello"})
        const receiveId = req.query.receiveId;
        if(!receiveId){
            return res.status(404)
        }

        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
       
        const linkContent = await link.get(receiveId, limit, offset);
        
        if(linkContent ){
            const links = linkContent.map((value)=>{
                return {
                    id: value.id,
                    link: value.content,
                    type: value.type
                }
             })
            res.status(200).json({
                data: links,
                message: "Thành công!"
            })
        }else{
            res.status(200).json({
                data: [], 
                message: "Thành công!"
            })
        }
        
    }catch(err){
        console.error(err)
        return res.sendStatus(500)
    }
}
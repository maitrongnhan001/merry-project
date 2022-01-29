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
                    fileName: value.link,
                }
             })
            res.status(200).json({
                data: links,
                message: "Thành công!"
            })
        }else{
            res.status(404).json({
                data: [], 
                message: "Thất bại!"
            })
        }
        
    }catch(err){
        console.error(err)
    }
}
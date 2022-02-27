const media = require('../models/mediaMessage.model')

module.exports.getMedia = async (req, res) => {
    try{
        const receiveId = req.query.receiveId;
        if(!receiveId){
            return res.status(404)
        }

        let limit = req.query.limit ?? '100000000';
        let offset = req.query.position ?? '0';
        limit = parseInt(limit);
        offset = parseInt(offset);
        const mediaContent = await media.get(receiveId, limit, offset);
      
        if(mediaContent ){
            const medias = mediaContent.map((value)=>{
                return {
                    id: value.id,
                    fileName: value.content,
                    type: value.type,
                }
             })
            res.status(200).json({
                data: medias,
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

module.exports.getlink = ()=>{

}
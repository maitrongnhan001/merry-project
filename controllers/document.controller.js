const document = require('../models/document.model')

module.exports.getdocument = async (req, res) =>{
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

        const documentContend = await document.get(receiveId, limit, offset);
        
        if(documentContend ){
            const documents = documentContend.map((value)=>{
                return {
                    id: value.id,
                    fileName: value.content,
                    type: value.type
                }
             })
            res.status(200).json({
                data: documents,
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

export default {
    pixImg: function (val, pix = 'http://localhost:3030') {
        return pix + val;
    },
    dataTime: (val)=>{
        console.log("11111111111")
        val = parseInt(val)
        // let da = new Date();
        
        return new Date(val).toLocaleString();

    }
}
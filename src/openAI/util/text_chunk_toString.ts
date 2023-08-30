import { text_chunk } from "src/doc_query/DTO/text_chunk.dto";

export function text_chunk_toString(text: text_chunk[]) : string{
   


    let final_text = "";
    
    text.map((item)=>{
        final_text +=  item.pageContent.replace(/\n/g, ' ');
        final_text+='\n'
    })  
    
 
    return final_text;
}
 
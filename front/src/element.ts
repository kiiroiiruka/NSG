export class Element 
{
    image : {name:string,path:string};
    constructor(name:string,path:string){
        this.image={name,path}
    }
    preload() 
    {
        this.load.image(this.image.name,this.image.path);
  
    }
    create() 
    {
      // マップを生成
  
    }
    update()//
    {
    
    }
}
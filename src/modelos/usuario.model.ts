export class UsuarioModelo{
    _id:string="";
    strNombre:string="";
    strApellido:string="";
    strCorreo:string="";
    strContraseña:string="";
    constructor(values: Object = {}) {
        Object.assign(this, values);
   }
    
}
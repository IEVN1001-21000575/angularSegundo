import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

interface Usuario{
  nombre: string;
  edad: number;
  email: string;
}

@Component({
  selector: 'app-ejemplo1',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './ejemplo1.component.html',
  styles: ``
})
export class Ejemplo1Component implements OnInit {

  formGroup!: FormGroup;
  nombre: string= 'Axel'

  persona: Usuario={
    nombre: '',
    edad: 0,
    email:''
  }

  constructor(private readonly fb: FormBuilder){}

  ngOnInit(): void {
    this.formGroup = this.initForm();
  }

  initForm():FormGroup{
    return this.fb.group({
      nombre: [''],
      edad:[''],
      email:[''],

    })
  }
  onSubmit():void{
    const {nombre, edad, email}=this.formGroup.value;
    this.persona.nombre=nombre
    this.persona.edad=edad
    this.persona.email=email
    

    let personaJSON = JSON.stringify(this.persona);

    //console.log("form ->", this.formGroup.value);

    localStorage.setItem("persona",personaJSON);
  }

  subImprime():void{
    const usuarioGuardado = localStorage.getItem('persona');
    if (usuarioGuardado){
      const usuaRecuperado: Usuario = JSON.parse(usuarioGuardado);
      this.persona=usuaRecuperado;
    }
  }
}

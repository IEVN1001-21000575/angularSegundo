import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

interface Empleado {
  matricula: string;
  nombre: string;
  email: string;
  edad: number;
  horas: number;
}

@Component({
  selector: 'app-empleados',
  templateUrl: './registro.html',
  styles: ['']
})
export class EmpleadosComponent implements OnInit {
  formGroup!: FormGroup;
  empleados: Empleado[] = [];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.fb.group({
      matricula: [''],
      nombre: [''],
      email: [''],
      edad: [''],
      horas: ['']
    });
    this.cargarEmpleados();
  }

  onRegister(): void {
    const nuevoEmpleado = this.formGroup.value as Empleado;
    this.empleados.push(nuevoEmpleado);
    this.guardarEmpleados();
    this.formGroup.reset();
  }

  guardarEmpleados(): void {
    localStorage.setItem('empleados', JSON.stringify(this.empleados));
  }

  cargarEmpleados(): void {
    const data = localStorage.getItem('empleados');
    if (data) {
      this.empleados = JSON.parse(data);
    }
  }

  calcularPago(horas: number): number {
    if (horas > 40) {
      const extra = horas - 40;
      return (40 * 70) + (extra * 140);
    } else {
      return horas * 70;
    }
  }

  modificarEmpleado(): void {
    const matricula = prompt("Ingrese la matrícula del empleado a modificar:");
    const empleado = this.empleados.find(e => e.matricula === matricula);
    if (empleado) {
      const nuevosDatos = this.formGroup.value;
      empleado.nombre = nuevosDatos.nombre || empleado.nombre;
      empleado.email = nuevosDatos.email || empleado.email;
      empleado.edad = nuevosDatos.edad || empleado.edad;
      empleado.horas = nuevosDatos.horas || empleado.horas;
      this.guardarEmpleados();
    }
  }

  eliminarEmpleado(): void {
    const matricula = prompt("Ingrese la matrícula del empleado a eliminar:");
    this.empleados = this.empleados.filter(e => e.matricula !== matricula);
    this.guardarEmpleados();
  }
}

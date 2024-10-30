import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-empleado',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export default class EmpleadoComponent {
  matricula: string = '';
  nombre: string = '';
  correo: string = '';
  edad: number | null = null;
  horasTrabajadas: number | null = null;
  empleadosGuardados: Array<{
    matricula: string,
    nombre: string,
    correo: string,
    edad: number,
    horasTrabajadas: number,
    horasPorPagar: number,
    horasExtras: number,
    subtotal: number
  }> = [];
  mostrarTabla: boolean = false;
  filtroMatricula: string = '';
  modoEdicion: boolean = false;
  indiceEdicion: number | null = null;

  constructor() {
    const empleadosEnLocalStorage = localStorage.getItem('empleados');
    if (empleadosEnLocalStorage) {
      this.empleadosGuardados = JSON.parse(empleadosEnLocalStorage);
    }
  }

  registrarEmpleado() {
    if (this.matricula && this.nombre && this.correo && this.edad && this.horasTrabajadas !== null) {
      const horasPorPagar = this.horasTrabajadas > 40 ? 40 : this.horasTrabajadas;
      const horasExtras = this.horasTrabajadas > 40 ? this.horasTrabajadas - 40 : 0;
      const pagoHorasRegulares = horasPorPagar * 70; // Pago por horas regulares
      const pagoHorasExtras = horasExtras * 140; // Pago por horas extras
      const subtotal = pagoHorasRegulares + pagoHorasExtras;

      const nuevoEmpleado = {
        matricula: this.matricula,
        nombre: this.nombre,
        correo: this.correo,
        edad: this.edad,
        horasTrabajadas: this.horasTrabajadas,
        horasPorPagar: pagoHorasRegulares, // Mostrar cantidad de dinero
        horasExtras: pagoHorasExtras, // Mostrar cantidad de dinero
        subtotal: subtotal
      };

      if (this.modoEdicion && this.indiceEdicion !== null) {
        this.empleadosGuardados[this.indiceEdicion] = nuevoEmpleado;
        this.modoEdicion = false;
        this.indiceEdicion = null;
    
      } else {
        this.empleadosGuardados.push(nuevoEmpleado);
      }

      this.actualizarLocalStorage();
      this.limpiarCampos();
    } else {
      alert('Por favor, llena todos los campos.');
    }
  }

  iniciarModificacion() {
    const empleado = this.empleadosGuardados.find((emp, index) => {
      if (emp.matricula === this.filtroMatricula) {
        this.indiceEdicion = index;
        return true;
      }
      return false;
    });

    if (empleado) {
      this.matricula = empleado.matricula;
      this.nombre = empleado.nombre;
      this.correo = empleado.correo;
      this.edad = empleado.edad;
      this.horasTrabajadas = empleado.horasTrabajadas;
      this.modoEdicion = true;
    } else {
      alert('Empleado no encontrado.');
    }
  }

  eliminarEmpleado() {
    const index = this.empleadosGuardados.findIndex(emp => emp.matricula === this.filtroMatricula);
    if (index !== -1) {
      this.empleadosGuardados.splice(index, 1);
      this.actualizarLocalStorage();
      this.limpiarCampos();
    } else {
      alert('Empleado no encontrado.');
    }
  }

  limpiarCampos() {
    this.matricula = '';
    this.nombre = '';
    this.correo = '';
    this.edad = null;
    this.horasTrabajadas = null;
    this.modoEdicion = false;
    this.indiceEdicion = null;
  }

  actualizarLocalStorage() {
    localStorage.setItem('empleados', JSON.stringify(this.empleadosGuardados));
  }

  calcularTotalGeneral(): number {
    return this.empleadosGuardados.reduce((total, empleado) => total + empleado.subtotal, 0);
  }

  imprimirTabla() {
    this.mostrarTabla = !this.mostrarTabla;
  }
}
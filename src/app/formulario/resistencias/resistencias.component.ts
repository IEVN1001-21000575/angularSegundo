import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
 
@Component({
  selector: 'app-resistencias',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './resistencias.component.html',
  styleUrls: ['./resistencias.component.css']
})
export default class ResistenciasComponent {
  color1: string = '';
  color2: string = '';
  color3: string = '';
  toleranciaColor: string = '';
  resistenciasGuardadas: Array<{
    color1: string,
    color2: string,
    color3: string,
    tolerancia: string,
    valor: number,
    minimo: number,
    maximo: number
  }> = [];
  valor: number = 0;
  minimo: number = 0;
  maximo: number = 0;
  mostrarTabla: boolean = false;
 
  constructor() {
    this.cargarResistencias();
  }
 
  cargarResistencias() {
    const datosGuardados = localStorage.getItem('resistencias');
    if (datosGuardados) {
      this.resistenciasGuardadas = JSON.parse(datosGuardados);
    }
  }
 
  guardarResistencia() {
    if (this.color1 && this.color2 && this.color3 && this.toleranciaColor) {
      const nuevaResistencia = {
        color1: this.color1,
        color2: this.color2,
        color3: this.color3,
        tolerancia: this.toleranciaColor,
        valor: this.calcularValor(),
        minimo: this.calcularMinimo(),
        maximo: this.calcularMaximo()
      };
 
      this.resistenciasGuardadas.push(nuevaResistencia);
      localStorage.setItem('resistencias', JSON.stringify(this.resistenciasGuardadas));
      
    } else {
    
    }
  }
 
  calcularValor(): number {
    const valor1 = this.obtenerValorColor(this.color1);
    const valor2 = this.obtenerValorColor(this.color2);
    const multiplicador = this.obtenerValorColor(this.color3);
 
    this.valor = (valor1 * 10 + valor2) * Math.pow(10, multiplicador);
    return this.valor;
  }
 
  calcularMinimo(): number {
    return this.toleranciaColor === 'dorado' ? this.valor * 0.95 : this.valor * 0.90; // ±5% o ±10%
  }
 
  calcularMaximo(): number {
    return this.toleranciaColor === 'dorado' ? this.valor * 1.05 : this.valor * 1.10; // ±5% o ±10%
  }
 
  obtenerValorColor(color: string): number {
    switch (color) {
      case 'negro': return 0;
      case 'marron': return 1;
      case 'rojo': return 2;
      case 'naranja': return 3;
      case 'amarillo': return 4;
      case 'verde': return 5;
      case 'azul': return 6;
      case 'violeta': return 7;
      case 'gris': return 8;
      case 'blanco': return 9;
      case 'dorado': return -1;
      case 'plateado': return -2;
      default: return -1;
    }
  }
 
  mostrarTablaResistencias() {
    this.mostrarTabla = true; 
  }
 
  obtenerColor(color: string): string {
    const colores: { [key: string]: string } = {
      'negro': '#000000',
      'marron': '#964B00',
      'rojo': '#FF0000',
      'naranja': '#FFA500',
      'amarillo': '#FFFF00',
      'verde': '#008000',
      'azul': '#0000FF',
      'violeta': '#800080',
      'gris': '#808080',
      'blanco': '#FFFFFF',
      'dorado': '#FFD700',
      'plateado': '#C0C0C0'
    };
    return colores[color] || '#FFFFFF';
  }
}
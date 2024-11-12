import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TemapComponent } from './tem/temap/temap.component';
import { CapturaPedidoComponent } from './pizzas/captura-pedido/captura-pedido.component';
import { DetallePedidoComponent } from './pizzas/detalle-pedido/detalle-pedido.component';
import { VentasDiaComponent } from './pizzas/ventas-dia/ventas-dia.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TemapComponent, CapturaPedidoComponent, DetallePedidoComponent, VentasDiaComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angularSegundo';
}

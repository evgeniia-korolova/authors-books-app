import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from "@angular/material/button";
import { Layout } from "./shared/layout/layout";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  
}

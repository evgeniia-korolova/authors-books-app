import { Component} from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { Layout } from "./shared/layout/layout";

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}

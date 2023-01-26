import { Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {



  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadscript("https://cdn.jsdelivr.net/npm/typed.js@2.0.12");
    setTimeout(() => {
      this.loadscript("assets/js/custom.js");
    }, 100);
  }

  loadscript(src:string) {
    const script = this.renderer.createElement('script');
    script.src = src.trim();
    this.renderer.appendChild(document.head, script);
  }

}

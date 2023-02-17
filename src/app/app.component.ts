import { createViewChild } from '@angular/compiler/src/core';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  @ViewChild('svgGrid') svgGrid: ElementRef<SVGSVGElement>
  title = 'svg-test';
  selectedElement;
  offsetX = 0;
  offsetY = 0;


  pointerDown(event) {
    console.log("pointerDown", event)
    if(event.target.classList.contains("draggable")) {
      this.selectedElement = event.target;

      let targetPositionX = this.selectedElement.getAttributeNS(null, 'x')
      let targetPositionY = this.selectedElement.getAttributeNS(null, 'y')

      let mousePositionX = event.clientX;
      let mousePositionY = event.clientY;

      let ctm = this.svgGrid.nativeElement.getScreenCTM();
      mousePositionX -= ctm.e;
      mousePositionY -= ctm.f;

      this.offsetX = mousePositionX - targetPositionX;
      this.offsetY = mousePositionY - targetPositionY;

      console.log("this.offsetX", this.offsetX);
      console.log("this.offsetY", this.offsetY);

    }

  }

  pointerMove(event) {
    if(this.selectedElement) {
      //console.log("pointerMove", event)

      let mousePositionX = event.clientX;
      let mousePositionY = event.clientY;

      console.log("mousePositionX", mousePositionX);
      console.log("mousePositionY", mousePositionY);

      
      let ctm = this.svgGrid.nativeElement.getScreenCTM();
      mousePositionX -= ctm.e;
      mousePositionY -= ctm.f;

      mousePositionX -= this.offsetX;
      mousePositionY -= this.offsetY;


      this.selectedElement.setAttributeNS(null, 'x', mousePositionX);
      this.selectedElement.setAttributeNS(null, 'y', mousePositionY);
      
      console.log("mousePositionX", mousePositionX)
      console.log("mousePositionY", mousePositionY)

    }
    event.preventDefault();
  }

  pointerUp(event) {
    console.log("pointerUp", event)
    this.selectedElement = null;
  }


}

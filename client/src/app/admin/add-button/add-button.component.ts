import { Component, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent {
  @Output() addButtonEvent = new EventEmitter();

  clickOnButton(){
    this.addButtonEvent.emit('event');
  }
}

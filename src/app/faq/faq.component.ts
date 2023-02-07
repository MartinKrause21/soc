import { trigger, state, style, animate, transition } from '@angular/animations';
import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
  animations: [
    trigger('appear', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(100%)',
        filter: 'blur(5px)'
      })),
      transition('hidden => visible', animate('300ms ease-in'))
    ]),
    trigger('animateLeft', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        filter: 'blur(5px)'
      })),
      transition('hidden => visible', animate('300ms ease-in'))
    ]),

    trigger('animateLeft1Card', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        filter: 'blur(5px)'
      })),
      transition('hidden => visible', animate('400ms ease-in'))
    ]),
    trigger('animateLeft2Card', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        filter: 'blur(5px)'
      })),
      transition('hidden => visible', animate('350ms ease-in'))
    ]),
    trigger('animateLeft3Card', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        filter: 'blur(5px)'
      })),
      transition('hidden => visible', animate('300ms ease-in'))
    ]),
    trigger('animateLeft4Card', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        filter: 'blur(5px)'
      })),
      transition('hidden => visible', animate('250ms ease-in'))
    ]),
    trigger('animateLeft5Card', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateX(-100%)',
        filter: 'blur(5px)'
      })),
      transition('hidden => visible', animate('200ms ease-in'))
    ])
  ]
})
export class FaqComponent implements OnInit {

  constructor(
    private renderer: Renderer2, 
    private el: ElementRef) { }

  panelOpenState = false;
  visibility = 'hidden';

  ngOnInit(): void {
    setTimeout(() => {
      this.visibility = 'visible';
    }, 100);
  }

}

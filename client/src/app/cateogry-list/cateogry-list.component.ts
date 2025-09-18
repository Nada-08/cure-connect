import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cateogry-list',
  imports: [RouterLink, UpperCasePipe],
 templateUrl: './cateogry-list.component.html',
styleUrls: ['./cateogry-list.component.css', '../home/home.component.css']
})
export class CateogryListComponent {
categories = [
  { title: 'dentistry', text: 'Dentists help keep your teeth, gums, and mouth healthy. They treat cavities, prevent oral diseases,&improve smiles through regular care and treatments.', icon: 'fa-solid fa-tooth' },
  { title: 'cardiology', text: 'SCardiologists are doctors who specialize in heart health. They diagnose, treat, and help prevent heart and blood vessel diseases to keep your heart strong.', icon: 'fa-solid fa-heart-pulse' },
  { title: 'ophthalmology', text: 'Ophthalmologists are eye specialists who diagnose and treat vision problems, eye diseases, and provide care to keep your eyesight healthy', icon: 'fa-solid fa-eye' },
  { title: 'pediatrics', text: 'Pediatricians care for infants, children, and teenagers, focusing on growth, development, and overall health.', icon: 'fa-solid fa-person-breastfeeding' },
  { title: 'internal medicine', text: 'Internal medicine doctors specialize in adult health, diagnosing and managing a wide range of medical conditions.', icon: 'fa-solid fa-stethoscope' }

];
}

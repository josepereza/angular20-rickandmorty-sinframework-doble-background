import { Component, computed, inject, signal } from '@angular/core';
import { RickAndMorty } from '../../services/rick-and-morty';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { Character } from '../../interfaces/character';
import { NgOptimizedImage } from '@angular/common'
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-character-list',
  imports: [ReactiveFormsModule, RouterLink, NgOptimizedImage,MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './character-list.html',
  styleUrl: './character-list.css'
})
export default class CharacterList {
  private rickAndMortyService = inject(RickAndMorty);
  searchControl = new FormControl('');
  characters = signal<Character[]>([]);

   constructor() {
   this.rickAndMortyService.getCharacters(this.searchControl.value ?? '')
        .subscribe(response => this.characters.set(response.results));
  }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(() => {
 
 this.rickAndMortyService.getCharacters(this.searchControl.value ?? '')
        .subscribe(response => this.characters.set(response.results));
    });
  }
}

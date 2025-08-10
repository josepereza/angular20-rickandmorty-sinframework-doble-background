import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, DOCUMENT, ElementRef, HostListener, Inject, PLATFORM_ID, Renderer2, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
    @ViewChild('logoLink') logoLink!: ElementRef;

    

 // Signal para detectar si el usuario ha hecho scroll
  isScrolled = signal(false);
  // Signal para controlar el estado del menú hamburguesa
  isMenuOpen = signal(false);

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2, // 2. Inyectamos Renderer2
    private el: ElementRef,

  ) {}
 ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
        // 3. Establecemos el estado inicial programáticamente
        this.renderer.addClass(this.logoLink.nativeElement, 'title-top');
    }
  }

 

  // Escucha el evento de scroll en el documento
  @HostListener('document:scroll', [])
  onDocumentScroll() {
    // Si el scroll vertical es mayor a 50px, actualiza el signal
    this.isScrolled.set(document.documentElement.scrollTop > 50);

      if (isPlatformBrowser(this.platformId)) {
  const scrollOffset = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;  
      const logoElement = this.logoLink.nativeElement;

      // 4. Usamos Renderer2 para añadir/quitar clases
      if (scrollOffset > 50) {
        this.renderer.removeClass(logoElement, 'title-top');
        this.renderer.addClass(logoElement, 'title-scrolled');
               
      } else {
        this.renderer.removeClass(logoElement, 'title-scrolled');
        this.renderer.addClass(logoElement, 'title-top');
      }
    }
  }

  // Método para cambiar el estado del menú
  toggleMenu() {
    this.isMenuOpen.update(value => !value);
  }

  // Método para cerrar el menú (útil al hacer clic en un enlace)
  closeMenu() {
    this.isMenuOpen.set(false);
  }
}

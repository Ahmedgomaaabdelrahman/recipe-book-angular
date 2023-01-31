import { Directive , HostBinding, HostListener } from "@angular/core";

@Directive({
    selector:'[appDropdown]', 

})
export class DropdownDirective {
    // to treat with "open" class depending on isOpen property.
    @HostBinding('class.open') isOpen = false; 
    @HostBinding('style.color') textColor = 'black';

    // trigger click event
    @HostListener('click') toggleOpen() {
        this.isOpen = !this.isOpen;
    } 

    @HostListener('mouseover') mouseOver() {
        this.textColor = 'red'
    }
    @HostListener('mouseleave') mouseLeave() {
        this.textColor = 'black'
    }
}
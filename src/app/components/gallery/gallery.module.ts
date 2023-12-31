import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GalleryRoutingModule } from './gallery-routing.module';
import { GalleryGridComponent } from './gallery-grid/gallery-grid.component';
import { GalleryDescComponent } from './gallery-desc/gallery-desc.component';
import { MesonryComponent } from './mesonry/mesonry.component';
import { HoverEffectComponent } from './hover-effect/hover-effect.component';
import { GalleryModule } from 'ng-gallery';
import { LightboxModule } from 'ng-gallery/lightbox';
import { NgxMasonryModule } from 'ngx-masonry';
import 'hammerjs';
import 'mousetrap';

@NgModule({
  declarations: [GalleryGridComponent, GalleryDescComponent, MesonryComponent, HoverEffectComponent],
  imports: [
    CommonModule,
    GalleryRoutingModule,
    LightboxModule,
    GalleryModule,
    NgxMasonryModule
  ]
})
export class GalleryDemoModule { }

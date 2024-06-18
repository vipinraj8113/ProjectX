import {
  Component,
  OnInit,
  OnDestroy,
  NgModule,
  Input,
  ViewChild,
} from '@angular/core';
import { DxTreeViewTypes } from 'devextreme-angular/ui/tree-view';
import { DxDrawerModule, DxDrawerTypes } from 'devextreme-angular/ui/drawer';
import { DxScrollViewComponent } from 'devextreme-angular/ui/scroll-view';
import { CommonModule } from '@angular/common';

import { Router, RouterModule, NavigationEnd, Event } from '@angular/router';
import { ScreenService, AppInfoService } from '../../services';
import {
  SideNavigationMenuModule,
  AppHeaderModule,
  AppFooterModule,
} from '../../components';
import {
  DxButtonModule,
  DxSortableModule,
  DxTabPanelModule,
  DxListModule,
  DxTemplateModule,
} from 'devextreme-angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-side-nav-outer-toolbar',
  templateUrl: './side-nav-outer-toolbar.component.html',
  styleUrls: ['./side-nav-outer-toolbar.component.scss'],
})
export class SideNavOuterToolbarComponent implements OnInit, OnDestroy {
  @ViewChild(DxScrollViewComponent, { static: true })
  scrollView!: DxScrollViewComponent;

  @Input()
  title!: string;

  selectedRoute = '';

  menuOpened!: boolean;

  temporaryMenuOpened = false;

  menuMode: DxDrawerTypes.OpenedStateMode = 'shrink';

  menuRevealMode: DxDrawerTypes.RevealMode = 'expand';

  minMenuSize = 0;

  shaderEnabled = false;

  routerSubscription: Subscription;

  screenSubscription: Subscription;
  tabs: any[] = [];
  selectedIndex = 0;
  constructor(
    private screen: ScreenService,
    private router: Router,
    public appInfo: AppInfoService
  ) {
    this.routerSubscription = this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.selectedRoute = event.urlAfterRedirects.split('?')[0];
      }
    });
  }

  ngOnInit() {
    this.menuOpened = this.screen.sizes['screen-large'];

    this.screenSubscription = this.screen.changed.subscribe(() =>
      this.updateDrawer()
    );

    this.updateDrawer();
  }

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
    this.screenSubscription.unsubscribe();
  }

  updateDrawer() {
    const isXSmall = this.screen.sizes['screen-x-small'];
    const isLarge = this.screen.sizes['screen-large'];

    this.menuMode = isLarge ? 'shrink' : 'overlap';
    this.menuRevealMode = isXSmall ? 'slide' : 'expand';
    this.minMenuSize = isXSmall ? 0 : 48;
    this.shaderEnabled = !isLarge;
  }

  get hideMenuAfterNavigation() {
    return this.menuMode === 'overlap' || this.temporaryMenuOpened;
  }

  get showMenuAfterClick() {
    return !this.menuOpened;
  }

  // navigationChanged(event: DxTreeViewTypes.ItemClickEvent) {
  //   const path = (event.itemData as any).path;
  //   const pointerEvent = event.event;

  //   if (path && this.menuOpened) {
  //     if (event.node?.selected) {
  //       pointerEvent?.preventDefault();
  //     } else {
  //       this.router.navigate([path]);
  //     }

  //     if (this.hideMenuAfterNavigation) {
  //       this.temporaryMenuOpened = false;
  //       this.menuOpened = false;
  //       pointerEvent?.stopPropagation();
  //     }
  //   } else {
  //     pointerEvent?.preventDefault();
  //   }
  // }

  //===================================================================
  navigationChanged(event: DxTreeViewTypes.ItemClickEvent) {
    const path = (event.itemData as any).path;
    const pointerEvent = event.event;
    // console.log(pointerEvent)
    
    if (path && this.menuOpened) {   
      //  this.router.navigate([path])
      const tabExists = this.tabs.some((tab) => tab.path === path);
      if (!tabExists) {
        this.tabs.push({
          title: event.itemData.text,
          path: path,
          content: `Content for ${event.itemData.text}`,
        });
        this.selectedIndex = this.tabs.length - 1;
        // this.router.navigate([path]);
      } else {
        this.selectedIndex = this.tabs.findIndex((tab) => tab.path === path);
      }
      
      if (this.menuOpened) {
        pointerEvent?.preventDefault();
      }
      if (this.hideMenuAfterNavigation) {
        this.menuOpened = false;
        pointerEvent?.stopPropagation();
      }
    } else {
      pointerEvent?.preventDefault();
    }
  }

  navigationClick() {
    // this.menuOpened = !this.menuOpened;
    if (this.showMenuAfterClick) {
      this.temporaryMenuOpened = true;
      this.menuOpened = true;
    }
  }

  disableButton() {
    // Disable Add Tab button if needed
    return false;
  }

  onTabDragStart(event) {
    // Logic for tab drag start
  }

  onTabDrop(event) {
    // Logic for tab drop
  }

  showCloseButton() {
    // Logic to show/hide close button
    return true;
  }

  closeButtonHandler(tab:any) {
    // Logic to handle tab close
    this.tabs = this.tabs.filter((t) => t !== tab);
    if (this.selectedIndex >= this.tabs.length) {
      this.selectedIndex = this.tabs.length - 1;
    }
  }

 
}

@NgModule({
  imports: [
    RouterModule,
    SideNavigationMenuModule,
    DxDrawerModule,
    AppHeaderModule,
    CommonModule,
    AppFooterModule,
    DxButtonModule,
    DxSortableModule,
    DxTabPanelModule,
    DxListModule,
    DxTemplateModule,
  ],
  exports: [SideNavOuterToolbarComponent],
  declarations: [SideNavOuterToolbarComponent],
})
export class SideNavOuterToolbarModule {}

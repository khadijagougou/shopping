import {Component, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import {CdkPortal, PortalModule} from "@angular/cdk/portal";
import {Overlay, OverlayConfig} from "@angular/cdk/overlay";

@Component({
  selector: 'app-dialog-overview-example-dialog',
  standalone: true,
  imports: [PortalModule],
  template: `
    <ng-template cdkPortal>
      <div class="modal">
        <div class="modal__header">
          <ng-content select="[modal-header]"></ng-content>
          <button (click)="closeModal.emit()">
            Close
          </button>
        </div>
        <div class="modal__body"></div>
        <ng-content select="[modal-body]"></ng-content>

      </div>
    </ng-template>`,
  styleUrl: './dialog-overview-example-dialog.component.scss'
})
export class DialogOverviewExampleDialogComponent {
  @ViewChild(CdkPortal) portal: CdkPortal | undefined
  @Output() closeModal = new EventEmitter<void>();
  overlay = inject(Overlay)
  overlayConfig = new OverlayConfig({
    hasBackdrop: true,
    positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
    scrollStrategy: this.overlay.scrollStrategies.block(),
    minWidth: 500
  });
  overlayRef = this.overlay.create(this.overlayConfig);
  ngOnInit(){
    this.overlayRef.backdropClick().subscribe(()=>{
      this.closeModal.emit()
    })
    this.overlayConfig.minWidth = this.minWidth;
    this.overlayConfig.minHeight = this.minHeight;
    this.overlayRef.updateSize({
      minWidth: this.minWidth,
      minHeight: this.minHeight
    });
  }
  ngAfterViewInit(){
    this.overlayRef?.attach(this.portal)
  }
  ngOnDestroy(){
    this.overlayRef?.detach();
    this.overlayRef?.dispose();
  }
  @Input() minWidth = 500;
  @Input() minHeight = 300;


}

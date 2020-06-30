import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Tenant, DefaultTenant } from '../tenants/tenant';
import { HousesService } from '../houses.service';
import { Flat } from '../flats/flat';
import { FlatsService } from '../flats.service';

@Component({
  selector: 'app-add-update-tenants',
  templateUrl: './add-update-tenants.component.html',
  styleUrls: ['./add-update-tenants.component.css']
})
export class AddUpdateTenantsComponent implements OnInit{
  constructor(private flatService: FlatsService) { // houses service .. :(
    flatService.get().subscribe((data: Array<Flat>) => this.flats = data);
    this.clearTenants();
  }
  /**
   * Emitter that emits newly created tenant when new tenant was created
   *
   * @type {EventEmitter<Tenant>}
   * @memberof AddUpdateTenantsComponent
   */
  @Output() tenantCreated: EventEmitter<Tenant> = new EventEmitter();
  /**
   * Tenant information
   *
   * @type {Tenant}
   * @memberof AddUpdateTenantsComponent
   */
  @Input() tenant: Tenant;
  public flats: Array<Flat>;
  myTenant: any = {};

  ngOnInit(): void {
    console.log(this.tenant);
    Object.assign(this.myTenant, this.tenant);
    this.myTenant.flatId = 5;
  }

  /**
   * Method adds or updates tenant. Idk wtf is going on here
   *
   * @memberof AddUpdateTenantsComponent
   */
  addUpdateTenants() {
    console.log(this.myTenant);
    this.tenantCreated.emit(this.myTenant);
    // this.clearTenants();
  }


  changeId(flat: Flat) {
    this.myTenant["flatId"] = flat["id"];
  }
  /**
   * Method clears tenant ...
   *
   * @private
   * @memberof AddUpdateTenantsComponent
   */
  private clearTenants() {
    this.tenant = new DefaultTenant();
  };
}

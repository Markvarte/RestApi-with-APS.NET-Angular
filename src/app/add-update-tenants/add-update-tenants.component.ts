import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Tenant, DefaultTenant } from '../tenants/tenant';
import { HousesService } from '../houses.service';
import { Flat } from '../flats/flat';
import { FlatsService } from '../flats.service';
import { TenantsService } from '../tenants.service';

@Component({
  selector: 'app-add-update-tenants',
  templateUrl: './add-update-tenants.component.html',
  styleUrls: ['./add-update-tenants.component.css']
})
export class AddUpdateTenantsComponent implements OnInit{
  constructor() {
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

  ngOnInit(): void {

  }

  /**
   * Method adds or updates tenant. Idk wtf is going on here
   *
   * @memberof AddUpdateTenantsComponent
   */
  addUpdateTenants() {
    this.tenantCreated.emit(this.tenant);
    this.clearTenants();
  }

  /**
   * Method clears tenant ...
   *
   * @private
   * @memberof AddUpdateTenantsComponent
   */
  private clearTenants() {
    this.tenant = new DefaultTenant();
  }
}

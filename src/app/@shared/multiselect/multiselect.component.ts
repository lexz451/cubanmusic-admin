import { Component, Input, OnInit } from '@angular/core';
import { SelectableItem } from '@app/@core/model/selectable-item';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.css'],
})
export class MultiselectComponent implements OnInit {
  @Input() placeholder = 'Seleccionar';
  @Input() items: SelectableItem[] = [];
  @Input() selectedItems: SelectableItem[] = [];

  settings: IDropdownSettings = {
    allowSearchFilter: true,
    idField: 'id',
    textField: 'name',
    selectAllText: 'Seleccionar Todo',
    unSelectAllText: 'Deseleccionar Todo',
  };

  onItemSelected(item: SelectableItem) {}

  onSelectAll(items: SelectableItem[]) {}

  constructor() {}

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Material } from '../../../core/models/material.model';
import { MaterialStore } from '../../../core/services/material-store';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink
  ],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.css'
})
export class MaterialsComponent implements OnInit {

  // ============================================================
  // MATERIAL LIST
  // ============================================================

  materials: Material[] = [];


  // ============================================================
  // FORM
  // ============================================================

  showAddForm = false;

  isEditMode = false;

  editingMaterialId: string | null = null;

  materialName = '';

  materialUnit = '';

  materialRate: number | null = null;


  // ============================================================
  // DELETE CONFIRMATION
  // ============================================================

  showDeleteConfirm = false;

  materialToDelete: Material | null = null;


  // ============================================================
  // CONSTRUCTOR
  // ============================================================

  constructor(
    private readonly materialStore: MaterialStore
  ) {}


  // ============================================================
  // INITIALIZE
  // ============================================================

  ngOnInit(): void {

    this.loadMaterials();

  }


  // ============================================================
  // LOAD MATERIALS
  // ============================================================

  loadMaterials(): void {

    this.materials =
      this.materialStore.getMaterials();

  }


  // ============================================================
  // OPEN ADD FORM
  // ============================================================

  openAddForm(): void {

    this.resetForm();

    this.isEditMode = false;

    this.editingMaterialId = null;

    this.showAddForm = true;

  }


  // ============================================================
  // OPEN EDIT FORM
  // ============================================================

  editMaterial(
    material: Material
  ): void {

    this.isEditMode = true;

    this.editingMaterialId =
      material.id;

    this.materialName =
      material.name;

    this.materialUnit =
      material.unit;

    this.materialRate =
      material.rate;

    this.showAddForm = true;

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }


  // ============================================================
  // SAVE / UPDATE MATERIAL
  // ============================================================

  saveMaterial(): void {

    const name =
      this.materialName.trim();

    const unit =
      this.materialUnit.trim();

    const rate =
      Number(this.materialRate);


    // ----------------------------------------------------------
    // BASIC VALIDATION
    // ----------------------------------------------------------

    if (
      !name ||
      !unit ||
      rate <= 0
    ) {

      return;

    }


    // ----------------------------------------------------------
    // DUPLICATE NAME CHECK
    // ----------------------------------------------------------

    const duplicate =
      this.materialStore
        .getAllMaterials()
        .find(
          material =>
            material.name
              .trim()
              .toLowerCase() ===
              name.toLowerCase() &&
            material.id !==
              this.editingMaterialId
        );


    if (duplicate) {

      return;

    }


    // ----------------------------------------------------------
    // UPDATE EXISTING MATERIAL
    // ----------------------------------------------------------

    if (
      this.isEditMode &&
      this.editingMaterialId
    ) {

      const existingMaterial =
        this.materialStore.getMaterialById(
          this.editingMaterialId
        );


      if (!existingMaterial) {

        return;

      }


      const updatedMaterial: Material = {

        ...existingMaterial,

        name,

        unit,

        rate,

        updatedAt:
          new Date().toISOString()

      };


      const updated =
        this.materialStore.updateMaterial(
          updatedMaterial
        );


      if (!updated) {

        return;

      }


      this.loadMaterials();

      this.cancelForm();

      return;

    }


    // ----------------------------------------------------------
    // CREATE NEW MATERIAL
    // ----------------------------------------------------------

    const now =
      new Date().toISOString();


    const material: Material = {

      id: crypto.randomUUID(),

      name,

      unit,

      rate,

      active: true,

      createdAt: now,

      updatedAt: now

    };


    this.materialStore.addMaterial(
      material
    );


    this.loadMaterials();

    this.cancelForm();

  }


  // ============================================================
  // OPEN DELETE CONFIRMATION
  // ============================================================

  confirmDelete(
    material: Material
  ): void {

    this.materialToDelete =
      material;

    this.showDeleteConfirm = true;

  }


  // ============================================================
  // DELETE / DEACTIVATE MATERIAL
  // ============================================================

  deleteMaterial(): void {

    if (!this.materialToDelete) {

      return;

    }


    this.materialStore.deleteMaterial(
      this.materialToDelete.id
    );


    this.loadMaterials();

    this.closeDeleteConfirmation();

  }


  // ============================================================
  // CLOSE DELETE CONFIRMATION
  // ============================================================

  closeDeleteConfirmation(): void {

    this.showDeleteConfirm = false;

    this.materialToDelete = null;

  }


  // ============================================================
  // CANCEL FORM
  // ============================================================

  cancelForm(): void {

    this.showAddForm = false;

    this.isEditMode = false;

    this.editingMaterialId = null;

    this.resetForm();

  }


  // ============================================================
  // RESET FORM VALUES
  // ============================================================

  resetForm(): void {

    this.materialName = '';

    this.materialUnit = '';

    this.materialRate = null;

  }

}
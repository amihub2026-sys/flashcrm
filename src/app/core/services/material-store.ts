import { Injectable } from '@angular/core';
import { Material } from '../models/material.model';

@Injectable({
  providedIn: 'root'
})
export class MaterialStore {

  private readonly materials: Material[] = [];

  // ============================================================
  // ADD MATERIAL
  // ============================================================

  addMaterial(
    material: Material
  ): void {

    this.materials.push(material);
  }

  // ============================================================
  // GET ALL ACTIVE MATERIALS
  // ============================================================

  getMaterials(): Material[] {

    return this.materials.filter(
      material => material.active
    );
  }

  // ============================================================
  // GET ALL MATERIALS
  // ============================================================

  getAllMaterials(): Material[] {

    return [
      ...this.materials
    ];
  }

  // ============================================================
  // GET MATERIAL BY ID
  // ============================================================

  getMaterialById(
    id: string
  ): Material | undefined {

    return this.materials.find(
      material => material.id === id
    );
  }

  // ============================================================
  // UPDATE MATERIAL
  // ============================================================

  updateMaterial(
    updatedMaterial: Material
  ): boolean {

    const index =
      this.materials.findIndex(
        material =>
          material.id === updatedMaterial.id
      );

    if (index === -1) {
      return false;
    }

    this.materials[index] =
      updatedMaterial;

    return true;
  }

  // ============================================================
  // DELETE / DEACTIVATE MATERIAL
  // ============================================================

  deleteMaterial(
    id: string
  ): boolean {

    const material =
      this.getMaterialById(id);

    if (!material) {
      return false;
    }

    material.active = false;

    return true;
  }

  // ============================================================
  // CLEAR
  // ============================================================

  clear(): void {

    this.materials.length = 0;
  }
}
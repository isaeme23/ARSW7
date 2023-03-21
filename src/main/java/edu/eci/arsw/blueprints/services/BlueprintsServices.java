/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.services;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import edu.eci.arsw.blueprints.persistence.filters.FiltersPersistence;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author hcadavid
 */
@Service
public class BlueprintsServices {
   
    @Autowired
    BlueprintsPersistence bpp;

    @Autowired
    FiltersPersistence fpp;
    
    public void addNewBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        bpp.saveBlueprint(bp);
    }
    
    public HashSet<Blueprint> getAllBlueprints() {
        return bpp.getBlueprints();
    }
    
    /**
     * 
     * @param author blueprint's author
     * @param name blueprint's name
     * @return the blueprint of the given name created by the given author
     * @throws BlueprintNotFoundException if there is no such blueprint
     */
    public Blueprint getBlueprint(String author,String name) throws BlueprintNotFoundException{
        try{
            return bpp.getBlueprint(author, name);
        } catch (BlueprintNotFoundException e) {
            throw new BlueprintNotFoundException(e.getMessage());
        }
    }
    
    /**
     * 
     * @param author blueprint's author
     * @return all the blueprints of the given author
     * @throws BlueprintNotFoundException if the given author doesn't exist
     */
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException{
        try{
            return bpp.getBlueprintsByAuthor(author);
        } catch (BlueprintNotFoundException e) {
            throw new BlueprintNotFoundException(e.getMessage());
        }
    }

    public void registerBlueprint(Blueprint blueprint) throws BlueprintPersistenceException {
        try{
            bpp.saveBlueprint(blueprint);
        } catch (BlueprintPersistenceException e){
            throw new BlueprintPersistenceException(e.getMessage());
        }

    }

    public Blueprint newBlueprint(String name, String author) throws BlueprintPersistenceException {
        Blueprint b = bpp.newBlueprint(name, author);
        registerBlueprint(b);
        return b;
    }

    public void updateBlueprint(String name, String author, Blueprint blueprint){
        bpp.updateBlueprint(name, author, blueprint);
    }

    public void deleteBlueprint(String name, String author){
        bpp.deleteBlueprint(name, author);
    }
}

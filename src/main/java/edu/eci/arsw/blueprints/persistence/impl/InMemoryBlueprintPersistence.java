/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.blueprints.persistence.impl;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import edu.eci.arsw.blueprints.persistence.BlueprintNotFoundException;
import edu.eci.arsw.blueprints.persistence.BlueprintPersistenceException;
import edu.eci.arsw.blueprints.persistence.BlueprintsPersistence;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

/**
 *
 * @author hcadavid
 */
@Service
public class InMemoryBlueprintPersistence implements BlueprintsPersistence{

    private final Map<Tuple<String,String>,Blueprint> blueprints=new HashMap<>();

    public InMemoryBlueprintPersistence() {
        //Inicializar con al menos 3 planos
        // Plano 1
        // Asociado al mismo autor que el segundo plano
        Point[] pts=new Point[]{new Point(140, 140),new Point(115, 115)};
        Blueprint bp=new Blueprint("_authorname_", "_bpname_",pts);
        blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);

        // Plano 2
        // Asociado al mismo autor que el primer plano
        Point[] pts1=new Point[]{new Point(150, 150),new Point(115, 110)};
        Blueprint bp1=new Blueprint("_authorname_", "_bpnameone_",pts1);
        blueprints.put(new Tuple<>(bp1.getAuthor(),bp1.getName()), bp1);

        // Plano 3
        Point[] pts2=new Point[]{new Point(150, 150),new Point(115, 110)};
        Blueprint bp2=new Blueprint("_authorname1_", "_bpnametwo_ ",pts2);
        blueprints.put(new Tuple<>(bp2.getAuthor(),bp2.getName()), bp2);
    }    
    
    @Override
    public void saveBlueprint(Blueprint bp) throws BlueprintPersistenceException {
        if (blueprints.containsKey(new Tuple<>(bp.getAuthor(),bp.getName()))){
            throw new BlueprintPersistenceException("The given blueprint already exists: "+bp);
        }
        else{
            blueprints.put(new Tuple<>(bp.getAuthor(),bp.getName()), bp);
        }
    }

    @Override
    public Blueprint getBlueprint(String author, String bprintname) throws BlueprintNotFoundException {
        if (blueprints.containsKey(new Tuple<>(author, bprintname))){
            return blueprints.get(new Tuple<>(author, bprintname));
        }
        throw new BlueprintNotFoundException("Blueprint does not exist");
    }
    @Override
    public Set<Blueprint> getBlueprintsByAuthor(String author) throws BlueprintNotFoundException {
        Set<Blueprint> blueprintSet = new HashSet<>();
        for(Map.Entry<Tuple<String, String>, Blueprint> entry : blueprints.entrySet()){
            if (entry.getValue().getAuthor().equals(author)){
                blueprintSet.add(entry.getValue());
            }
        }
        return blueprintSet;
    }

    @Override
    public HashSet<Blueprint> getBlueprints(){
        return new HashSet<Blueprint>(blueprints.values());
    }


    @Override
    public Blueprint newBlueprint(String name, String author){
        return new Blueprint(name, author);
    }

    @Override
    public void updateBlueprint(String name, String author, Blueprint blueprint) {
        Tuple<String, String> key = new Tuple<>(author, name);
        blueprints.put(key, blueprint);
    }
}

package edu.eci.arsw.blueprints.persistence.filters;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class FilterSubsampling implements FiltersPersistence{

    @Override
    public Blueprint filter(Blueprint blueprint) {
        ArrayList<Point> pnts=new ArrayList<Point>();
        for (int i = 0; i < blueprint.getPoints().size() ; i++){
            if(i % 2 != 0){
                pnts.add(blueprint.getPoints().get(i));
            }
        }
        Point[] points = pnts.toArray(new Point[0]);
        return new Blueprint(blueprint.getName(), blueprint.getAuthor(), points);
    }
}
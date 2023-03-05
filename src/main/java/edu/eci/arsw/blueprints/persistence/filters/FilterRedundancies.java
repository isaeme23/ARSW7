package edu.eci.arsw.blueprints.persistence.filters;

import edu.eci.arsw.blueprints.model.Blueprint;
import edu.eci.arsw.blueprints.model.Point;

import java.util.ArrayList;

public class FilterRedundancies implements FiltersPersistence{
    @Override
    public Blueprint filter(Blueprint blueprint) {
        boolean redundancia;
        ArrayList<Point> pnts=new ArrayList<Point>();
        for (Point i :blueprint.getPoints()){
            redundancia=false;
            for(Point j : pnts){
                if(!i.equals(j)){
                    redundancia=true;
                    break;
                }
            }
            if(!redundancia){
                pnts.add(i);
            }
        }
        Point[] points = pnts.toArray(new Point[0]);
        return new Blueprint(blueprint.getAuthor(), blueprint.getName(), points);
    }
}

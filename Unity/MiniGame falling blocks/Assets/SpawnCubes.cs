using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SpawnCubes : MonoBehaviour{
    public GameObject cubePrefab;
    Vector2 screenHalf;
    public Vector2 spawnTimeMaxMin = new Vector2(1f, 0.3f);
    float nextSpawnTime;
    // Start is called before the first frame update
    
    void Start(){
        screenHalf = new Vector2(Camera.main.aspect*Camera.main.orthographicSize, Camera.main.orthographicSize);
    }

    // Update is called once per frame
    void Update(){
        if(Time.time > nextSpawnTime){
            float spawnTime = Mathf.Lerp(spawnTimeMaxMin.x, spawnTimeMaxMin.y, Difficulty.GetPercent());
            Vector2 spawnPosition = new Vector2(Random.Range(-screenHalf.x, screenHalf.x), screenHalf.y);
            GameObject newCube = (GameObject)Instantiate(cubePrefab, spawnPosition, Quaternion.Euler(0, 0, Random.Range(-10, 10)));
            newCube.transform.localScale = new Vector2(Random.Range(0.2f, 3f), Random.Range(2, 5));
            nextSpawnTime = Time.time + spawnTime;
            
        }
    }
    
}

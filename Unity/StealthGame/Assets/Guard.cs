using System.Collections;
using System.Collections.Generic;
using UnityEngine;


public class Guard : MonoBehaviour{

    public static event System.Action OnGuardSpot;
    public Transform pathHolder;
    public Transform player;
    public float speed = 5;
    public float waitTime = 100f;
    public float turnSpeed = 90f;
    public float viewDistance = 11;
    public float viewAngle;
    public LayerMask viewMask;
    public Light spotlight;
    Color startColor;
    float t = 0f;
   
    void Update(){
        if(CanSeePlayer()){
            t+=Time.deltaTime*2;
            if(t>1){
                t=1f;
            }
        }
        else{
            t-=Time.deltaTime*2;
            if(t<0){
                t=0f;
            }
        }
        spotlight.color = Color.Lerp(startColor, Color.red, t);
        if(t==1 && OnGuardSpot != null){
            OnGuardSpot();
        }
    }
    
    void Start(){
        viewAngle = spotlight.spotAngle;
        startColor = spotlight.color;
        Vector3[] waypoints = new Vector3[pathHolder.childCount];
        for(int i = 0; i < waypoints.Length; i++){
            waypoints[i] = pathHolder.GetChild(i).position;
            waypoints[i] = new Vector3(waypoints[i].x, transform.position.y, waypoints[i].z);
        }
        StartCoroutine(MoveLoop(waypoints));
    }

    bool CanSeePlayer(){
        if(Vector3.Distance(transform.position, player.position) < viewDistance){
            Vector3 dirToPlayer = (player.position - transform.position).normalized;
            if(Vector3.Angle(transform.forward, dirToPlayer) < viewAngle/2f){
                if(!Physics.Linecast(transform.position, player.position, viewMask)){
                    return true;
                }
            }
        }
        return false;
    }

    IEnumerator MoveLoop(Vector3[] waypoints){
        transform.position = waypoints[0];
        int currentIndex = 1;
        Vector3 currentWaypoint = waypoints[currentIndex];
        transform.LookAt(currentWaypoint);

        while(true){
            transform.position = Vector3.MoveTowards(transform.position, currentWaypoint, Time.deltaTime * speed);
            if(transform.position == currentWaypoint){
                currentIndex = (currentIndex + 1) % waypoints.Length;
                currentWaypoint = waypoints[currentIndex];
                yield return new WaitForSeconds(waitTime);
                yield return StartCoroutine(TurnLoop(currentWaypoint));
            }
            yield return null;
        }
    }

    IEnumerator TurnLoop(Vector3 turnTowards){
        Vector3 dir = (turnTowards - transform.position).normalized;
        float angle = Mathf.Atan2(dir.x, dir.z) * Mathf.Rad2Deg;

        while(Mathf.Abs(Mathf.DeltaAngle(angle, transform.eulerAngles.y)) > 0.005f){
            float currentAngle = Mathf.MoveTowardsAngle(transform.eulerAngles.y, angle, turnSpeed*Time.deltaTime);
            transform.eulerAngles = Vector3.up * currentAngle;
            yield return null;
        }
    }

    void OnDrawGizmos(){
        Vector3 startPos = pathHolder.GetChild(0).position;
        Vector3 prevPos = startPos;
        foreach (Transform waypoint in pathHolder){
            Gizmos.DrawSphere(waypoint.position, .3f);
            Gizmos.DrawLine(prevPos, waypoint.position);
            prevPos = waypoint.position;
        }
        Gizmos.DrawLine(prevPos, startPos);
    }
}

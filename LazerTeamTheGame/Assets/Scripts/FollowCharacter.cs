using UnityEngine;
using System.Collections;

public class FollowCharacter : MonoBehaviour
{
    private GameObject enemy;

    private void Start()
    {
        enemy = GameObject.FindWithTag("Enemy");
    }

    private void Update()
    {
        transform.LookAt(enemy.transform);
    }
}

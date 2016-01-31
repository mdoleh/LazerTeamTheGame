using UnityEngine;

public class Damage : MonoBehaviour
{
    public int DamageToDeal = 0;
    public bool ShouldAdjustTrigger = false;
    public int LayerToAdjustTriggerAgainst;
    public bool ShouldDestroyOnCollision = false;

    private void OnCollisionEnter2D(Collision2D other)
    {
        var character = other.gameObject.GetComponent<Character>();
        if (character != null)
        {
            character.TakeDamage(DamageToDeal);
        }
        if (other.gameObject.layer.Equals(LayerToAdjustTriggerAgainst) && ShouldAdjustTrigger)
        {
            GetComponent<Collider2D>().isTrigger = true;
        }
        if (ShouldDestroyOnCollision)
        {
            Destroy(gameObject);
        }
    }
}
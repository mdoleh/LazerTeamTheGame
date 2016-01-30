using System;
using UnityEngine;
using System.Collections;
using Assets.Scripts.Player;

public class ComboPlayerControls : MonoBehaviour, IComboPlayerControls
{
    [HideInInspector]
    public bool Shield;
    [HideInInspector]
    public bool Boots;
    [HideInInspector]
    public bool Gun;
    [HideInInspector]
    public bool Helmet;

    public float CoolDownTime = 5f;

    public GameObject beam;
    public GameObject shieldDash;

    private Rigidbody2D rigidbody;
    private float CoolDown;
    private bool readyToFire = true;

    private void Start()
    {
        rigidbody = GetComponent<Rigidbody2D>();
    }

    public void ShieldDash()
    {
        if (Shield && Boots && readyToFire)
        {
            resetCoolDown();
            Shield = false;
            Boots = false;
            disableBasicControls();
            shieldDash.SetActive(true);
            StartCoroutine(enableBasicControls(1f, () =>
            {
                shieldDash.transform.localScale = Vector2.zero;
                shieldDash.SetActive(false);
            }));
            if (GetComponent<Player>().facingRight)
                rigidbody.AddForce(Vector2.right * 10000f * rigidbody.mass);
            else
                rigidbody.AddForce(Vector2.left * 10000f * rigidbody.mass);
        }
    }

    public void DarkMatterRay()
    {
        if (Gun && Shield && readyToFire)
        {
            resetCoolDown();
            Gun = false;
            Shield = false;
            disableBasicControls();
            beam.SetActive(true);
            var animationLength = beam.GetComponent<Animator>().GetCurrentAnimatorClipInfo(0).Length;
            var originalMass = rigidbody.mass;
            rigidbody.mass = 100000f;
            StartCoroutine(enableBasicControls(animationLength, () =>
            {
                beam.transform.localScale = Vector2.zero;
                beam.SetActive(false);
                rigidbody.mass = originalMass;
                beam.GetComponentInChildren<Collider2D>().isTrigger = false;
            }));
        }
    }

    private IEnumerator enableBasicControls(float delay, Action afterDelay)
    {
        yield return new WaitForSeconds(delay);
        afterDelay();
        GetComponent<BasicPlayerControls>().enabled = true;
    }

    private void FixedUpdate()
    {
        CoolDown += Time.deltaTime;
        readyToFire = CoolDown >= CoolDownTime;
        ShieldDash();
        DarkMatterRay();
    }

    private void disableBasicControls()
    {
        GetComponent<BasicPlayerControls>().enabled = false;
    }

    private void resetCoolDown()
    {
        CoolDown = 0f;
        readyToFire = false;
    }
}

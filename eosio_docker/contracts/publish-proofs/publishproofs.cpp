#include <eosiolib/eosio.hpp>
#include <eosiolib/print.hpp>
using namespace eosio;

// Replace the contract class name when you start your own project
class publishproofs : public eosio::contract {
  private:
    /// @abi table
    struct proofstruct {
      uint64_t      prim_key;
      account_name  bank;
      std::string   proof;
      uint64_t      timestamp;

      // primary key
      auto primary_key() const { return prim_key; }
      // secondary key: user
      uint64_t get_by_proof() const { return proof; }
    };

    // create a multi-index table and support secondary key
    typedef eosio::multi_index< N(proofstruct), proofstruct,
      indexed_by< N(getbyproof), const_mem_fun<proofstruct, std::string, &proofstruct::get_by_proof> >
      > prooftable;

  public:
    using contract::contract;

    /// @abi action
    void publish( account_name _bank, std::string& _proof ) {
      // to sign the action with the given account
      require_auth( _bank );

      prooftable obj(_self, _self); // code, scope

      obj.emplace( _self, [&]( auto& foobar ) {
        foobar.prim_key = obj.available_primary_key();
        foobar.bank = _bank;
        foobar.proof = _proof;
        foobar.timestamp = now();
      });
    }

    /// @abi action
    account_name verify(std::string& _proof) {
      prooftable obj(_self, _self); // code, scope

      // TODO: return account_name of bank mathcing the proof
    }

};

// specify the contract name, and export a public action: update
EOSIO_ABI( publishproofs, (publish) )

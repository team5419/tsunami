package tests

import org.junit.jupiter.api.Test
import org.junit.jupiter.api.Assertions.assertTrue
import org.json.JSONObject

import org.team5419.tsunami.Config

class ConfigTest {

    @Test
    fun noPages() {
        var stringConf: Config = Config("{}")
        assertTrue(stringConf.configObject.similar(JSONObject("{\"pages\":[]}")))
    }
}
